type RootState = {};

type Action = {
  type: string;
};

const rootReducer = (state: RootState = {}, action: Action) => state;

export default rootReducer;
