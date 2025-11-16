-- CreateEnum
CREATE TYPE "Role" AS ENUM ('manager', 'supervisor', 'user');

-- CreateEnum
CREATE TYPE "TaskClassification" AS ENUM ('Provisioning', 'Maintenance', 'Others');

-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('Email', 'Phone', 'SMS_order', 'Manual_order');

-- CreateEnum
CREATE TYPE "Zone" AS ENUM ('EAAZ', 'CAAZ', 'SAAZ', 'NAAZ', 'SWAAZ', 'WAAZ', 'NR_Mekele', 'NWR_Bahirdar', 'ER_Dire_Dawa', 'CER_Harar', 'CNR_D_Birhan', 'WR_Nekempt', 'SER_Adama', 'SR_Hawassa', 'SWR_Jimma', 'CWR_Ambo', 'EER_Jigiiga', 'NEER_Semera', 'NNWR_Gonder', 'NER_Dessie', 'SWWR_Gambela', 'WWR_Assosa', 'SSWR_Wolyta', 'Bill_Section', 'Enterprise_office');

-- CreateEnum
CREATE TYPE "SpecificRequestType" AS ENUM ('CentrexGroupHuntingPBX', 'IMSSIPGPONComboService', 'ISDNE1ActivationDeactivation', 'ISDNE1VoiceService', 'ISDNDMigrationOrLineShifting', 'OnlineSupportPSTNMigrationTroubleshoot', 'OtherDataManagementTasks', 'ProductChangeH248ISDNToSIP', 'ShortCode3Or4DigitConfiguration', 'ShortNumberTermination', 'GeneralTroubleTicket');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('High', 'Medium', 'Low');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('Pending', 'In_Progress', 'Resolved');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TroubleTicket" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "serviceNumber" TEXT NOT NULL,
    "tasksClassification" "TaskClassification" NOT NULL,
    "requestType" "RequestType" NOT NULL,
    "specificRequestType" "SpecificRequestType" NOT NULL,
    "zone" "Zone" NOT NULL,
    "remarks" TEXT NOT NULL,
    "priority" "Priority" NOT NULL,
    "status" "TicketStatus" NOT NULL DEFAULT 'Pending',
    "pending_endAt" TIMESTAMP(3),
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,
    "handlerId" TEXT,

    CONSTRAINT "TroubleTicket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "TroubleTicket" ADD CONSTRAINT "TroubleTicket_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TroubleTicket" ADD CONSTRAINT "TroubleTicket_handlerId_fkey" FOREIGN KEY ("handlerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
