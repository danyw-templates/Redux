import _ from "lodash";
import jsonPlaceHolder from "../apis/jsonPlaceHolder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
};

// simple way
export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceHolder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceHolder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
}

//memoized way
// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
// const _fetchUser = _.memoize(async (id, dispatch) => { // memoize is a lodash function that will only allow a function to be called once with a given argument))
//   const response = await jsonPlaceHolder.get(`/users/${id}`);
//   dispatch({ type: "FETCH_USER", payload: response.data });
// });


// alternate way
// replce inside PostList.js: import { fetchPosts } from "../actions"; with import { fetchPostsAndUsers } from "../actions";
// then replace    componentDidMount() {
//        this.props.fetchPosts();
//      }
// with
// componentDidMount() {
//        this.props.fetchPostsAndUsers();
//      }
// and then hook it up with connect:
// export default connect(mapStateToProps, { fetchPosts })(PostList); with
// export default connect(mapStateToProps, { fetchPostsAndUsers })(PostList);
