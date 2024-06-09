-- CreateTable
CREATE TABLE "artist" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "song" (
    "id" TEXT NOT NULL,
    "nama" VARCHAR(50) NOT NULL,
    "email" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,

    CONSTRAINT "song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "album" (
    "id" TEXT NOT NULL,
    "namaProyek" VARCHAR(100) NOT NULL,

    CONSTRAINT "album_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "artist_email_key" ON "artist"("email");

-- CreateIndex
CREATE UNIQUE INDEX "song_email_key" ON "song"("email");

-- AddForeignKey
ALTER TABLE "song" ADD CONSTRAINT "song_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
