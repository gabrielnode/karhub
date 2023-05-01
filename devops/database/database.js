db = db.getSiblingDB("backend");
db.createUser({
  user: "backend_user",
  pwd: "backend_pass",
  roles: [
    {
      role: "dbOwner",
      db: "backend",
    },
  ],
});
