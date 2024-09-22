-- CreateTable
CREATE TABLE "trips" (
    "id" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "starts_at" TIMESTAMP(3) NOT NULL,
    "ends_at" TIMESTAMP(3) NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participants" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "is_owner" BOOLEAN NOT NULL DEFAULT false,
    "trip_id" TEXT NOT NULL,

    CONSTRAINT "participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "occurs_at" TIMESTAMP(3) NOT NULL,
    "trip_id" TEXT NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "links" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "trip_id" TEXT NOT NULL,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
