# API requests
- Middleware thunk passed to Redux store through the `applyMmidleware()`
- The actions are sent to Thunk first and then to the reducers.
- Because Thunk is used - Action creators do not need to return the object. They can now return functions as well.


# PostList
`mapStateToProps` maps the Redux state to the component's props. It receives a global state and returns an object with desired pieces of state as properties.
```js
const mapStateToProps = (state) => {
    return { posts: state.posts };
};
```
`connect()` takes `mapStateToProps` and an object containing the action creators to be mapped to the component's props. In this case, it's { fetchPostsAndUsers }.

```js
export default connect(mapStateToProps, { fetchPostsAndUsers })(PostList);
```
`connect()` returns a new function that wraps the `PostList` component. This new function is then invoked, passing the `PostList` component as an argument. **This process effectively connects the Redux state and the fetchPostsAndUsers action creator to the component's props.**

Component is connected to Redux store and action creator is mapped to the component's props. `this.props.fetchPostsAndUsers()` this function allows for action creator to be dispatched correctly.

# Action creator
- `lodash` library used for working with arrays, objects, and collections.
- `jsonPlaceHolder` - custom instance of the Axios library, for making HTTP requests.

`lodash` chain used for data manipulations on `getState().posts`:
- Extract all user IDs with the `map('userId')` method.
- Remove duplicates with the `uniq()` method.
- Dispatch the fetchUser action for each unique user ID with `forEach(id => dispatch(fetchUser(id)))`.
- Call `value()` to execute the chain.

```js
_.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
```