self.addEventListener("push", e => {
  const data = e.data.json();
  console.log(data)

  return self.registration.showNotification(
    data.title,
    {
      body: "Push notification from section.io"
    }
  )
});