import PropTypes from 'prop-types';
import React from 'react';
import StanceForm from './stance-form';
import gql from 'graphql-tag';
import {GET_ELECTION, STANCE_FRAGMENT} from '../../utils/queries';
import {useMutation} from '@apollo/react-hooks';

const CREATE_STANCE = gql`
  mutation CreateStance(
    $topicId: ID!
    $candidateId: ID!
    $textEn: String
    $textFr: String
    $sources: [SourceInput]
  ) {
    createStance(
      topicId: $topicId
      candidateId: $candidateId
      textEn: $textEn
      textFr: $textFr
      sources: $sources
    ) {
      ...StanceFragment
    }
  }
  ${STANCE_FRAGMENT}
`;

export default function CreateStanceForm(props) {
  const [createStance, {loading, error}] = useMutation(CREATE_STANCE, {
    onCompleted: props.onClose,
    update(cache, {data}) {
      const {election} = cache.readQuery({
        query: GET_ELECTION,
        variables: {
          id: props.electionId
        }
      });

      cache.writeQuery({
        query: GET_ELECTION,
        data: {
          election: {
            ...election,
            candidates: election.candidates.map(candidate =>
              candidate.id === props.candidate.id
                ? {
                    ...candidate,
                    stances: [...candidate.stances, data.createStance]
                  }
                : candidate
            )
          }
        }
      });
    },
    variables: {
      topicId: props.topic.id,
      candidateId: props.candidate.id
    }
  });

  return (
    <StanceForm
      title="Creating stance"
      buttonText="Create stance"
      stance={{sources: []}}
      candidate={props.candidate}
      topic={props.topic}
      onClose={props.onClose}
      mutation={createStance}
      loading={loading}
      error={error}
    />
  );
}

CreateStanceForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  candidate: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired,
  electionId: PropTypes.string.isRequired
};