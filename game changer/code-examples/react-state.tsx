function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    fetchUser()
      .then(data => {
        setUser(data);
        setName(data.name);
        setEmail(data.email);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (user) {
      setIsDirty(
        name !== user.name || email !== user.email
      );
    }
  }, [name, email, user]);

  useEffect(() => {
    document.title = name
      ? `Profile — ${name}`
      : 'Profile';
    return () => { document.title = 'App'; };
  }, [name]);

  const handleSave = useCallback(async () => {
    setLoading(true);
    try {
      await updateUser({ name, email });
      setUser({ ...user, name, email });
      setIsDirty(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [name, email, user]);

  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;

  return (
    <form onSubmit={handleSave}>
      <input value={name}
        onChange={e => setName(e.target.value)} />
      <input value={email}
        onChange={e => setEmail(e.target.value)} />
      <button disabled={!isDirty}>Save</button>
    </form>
  );
}
