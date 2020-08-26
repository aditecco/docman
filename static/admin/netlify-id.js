/* ---------------------------------
https://www.netlifycms.org/docs/add-to-your-site/
--------------------------------- */

if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/"
      })
    }
  })
}
