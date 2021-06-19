use e_max_erp;

db.roles.insertMany([
  { "_id": ObjectId("60c91ba8c5f1131cf8edb81d"), "isManager": true, "name": "Gerente Geral", "createdAt": ISODate("2021-06-15T21:29:12.378+0000"), "updatedAt": ISODate("2021-06-15T21:29:12.378+0000") },
  { "_id": ObjectId("60c91ba8c5f1131cf8edb81e"), "isManager": true, "name": "Gerente Loja", "createdAt": ISODate("2021-06-15T21:29:12.378+0000"), "updatedAt": ISODate("2021-06-15T21:29:12.378+0000") },
  { "_id": ObjectId("60c91ba8c5f1131cf8edb81f"), "isManager": false, "name": "Usuário Geral", "createdAt": ISODate("2021-06-15T21:29:12.378+0000"), "updatedAt": ISODate("2021-06-15T21:29:12.378+0000") },
  { "_id": ObjectId("60c91ba8c5f1131cf8edb820"), "isManager": false, "name": "Vendedor", "createdAt": ISODate("2021-06-15T21:29:12.378+0000"), "updatedAt": ISODate("2021-06-15T21:29:12.378+0000") }
]);

db.companies.insertMany([
  {
    "_id": ObjectId("60c662bb9cd09812d4d343dd"),
    "name": "Empresa 1",
    "corporateName": "Empresa 1 LTDA",
    "cnpj": "61184878000119",
    "createdAt": ISODate("2021-06-13T19:55:39.075+0000"),
    "updatedAt": ISODate("2021-06-13T19:55:39.075+0000")
  },
  {
    "_id": ObjectId("60c66fd0a4429a4444102fe6"),
    "name": "Empresa 2",
    "corporateName": "Empresa 2 LTDA",
    "cnpj": "89969214000184",
    "createdAt": ISODate("2021-06-13T20:51:28.714+0000"),
    "updatedAt": ISODate("2021-06-13T23:56:33.768+0000")
  },
  {
    "_id": ObjectId("60c695507c3cc652e0afa40c"),
    "name": "Empresa 3",
    "corporateName": "Empresa 3 LTDA",
    "cnpj": "51842011000150",
    "createdAt": ISODate("2021-06-13T23:31:28.575+0000"),
    "updatedAt": ISODate("2021-06-13T23:31:28.575+0000")
  }
]);

db.users.insertMany([
  {
    "_id": ObjectId("60ce30ff9e831112404d64ad"),
    "cpf": "41.033.608/0001-08",
    "email": "admin@emax.com.br",
    "hash": "$2b$10$Xuz3ylcqXwyCn17/7pqrr.qLt9RbhIppK7Yix8khPbYPgf4zva8oa",
    "password": "$2b$10$36VxETiTxc7KMg/mKmcRr.tI4yhESwoGurBl9/0Sj2nxL2IoHzF1G",
    "name": "Admin",
    "phone": "51999999999",
    "createdAt": ISODate("2021-06-19T18:01:35.779+0000"),
    "updatedAt": ISODate("2021-06-19T18:01:35.779+0000")
  }
]);

db.companyusers.insertMany([
  {
    "_id": ObjectId("60ccb08cfe2db34c70a756b9"),
    "user": ObjectId("60ce30ff9e831112404d64ad"),
    "company": ObjectId("60c662bb9cd09812d4d343dd"),
    "role": ObjectId("60c91ba8c5f1131cf8edb81d"),
    "createdAt": ISODate("2021-06-18T14:41:16.151+0000"),
    "updatedAt": ISODate("2021-06-18T14:41:16.151+0000")
  }
]);
