const handleLogout = async ({ doSignOut, navigation }) => {
  await doSignOut().then(() => {
    if (window.location.pathname !== "/") {
      navigation("/");
    }
  });
};

export default handleLogout;
