-- CreateTable
CREATE TABLE "Tutor" (
    "tutor_id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Tutor_pkey" PRIMARY KEY ("tutor_id")
);

-- CreateTable
CREATE TABLE "Tutee" (
    "tutee_id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Tutee_pkey" PRIMARY KEY ("tutee_id")
);
