/*
  Warnings:

  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_unidadeId_fkey`;

-- DropTable
DROP TABLE `order`;

-- CreateTable
CREATE TABLE `Encomenda` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `invoice` VARCHAR(191) NOT NULL,
    `tracking_code` VARCHAR(191) NOT NULL,
    `date_time_entry` DATETIME(3) NOT NULL,
    `date_time_departure` DATETIME(3) NOT NULL,
    `protocol` VARCHAR(191) NOT NULL,
    `unidadeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Encomenda` ADD CONSTRAINT `Encomenda_unidadeId_fkey` FOREIGN KEY (`unidadeId`) REFERENCES `Unidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
