import store from 'store';
import {STARS_KEY} from '../constants';
import {handleAction, combineActions} from 'redux-actions';
import {add, remove} from '../actions/stars';
import {loop, Cmd} from 'redux-loop';

const defaultState = store.get(STARS_KEY) || {};
export default handleAction(
  combineActions(add, remove),
  (state, action) => {
    const nextState = {
      ...state,
      [action.payload]: action.type === add.toString()
    };

    return loop(
      nextState,
      Cmd.run(store.set.bind(store), {args: [STARS_KEY, nextState]})
    );
  },
  defaultState
);