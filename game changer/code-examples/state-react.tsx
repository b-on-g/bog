// --- store/userSlice.ts ---
const userSlice = createSlice({
  name: 'user',
  initialState: { name: '', email: '', loading: false },
  reducers: {
    setName: (state, action) => { state.name = action.payload },
    setEmail: (state, action) => { state.email = action.payload },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => { state.loading = true })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.name = action.payload.name
        state.email = action.payload.email
        state.loading = false
      })
      .addCase(fetchUser.rejected, (state) => { state.loading = false })
  }
})

// --- store/index.ts ---
export const store = configureStore({
  reducer: { user: userSlice.reducer }
})

// --- components/Profile.tsx ---
function Profile() {
  const dispatch = useDispatch()
  const { name, email, loading } = useSelector(state => state.user)
  
  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  return (
    <div>
      <input value={name}
        onChange={e => dispatch(setName(e.target.value))} />
      <input value={email}
        onChange={e => dispatch(setEmail(e.target.value))} />
    </div>
  )
}
