"# nextSP" 
cd mylibrary

npm install

npx prisma generate schema=src/prisma/schema.prisma

npx prisma migrate schema=src/prisma/schema.prisma
