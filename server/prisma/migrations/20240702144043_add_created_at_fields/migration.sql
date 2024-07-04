/*
  Warnings:

  - You are about to drop the column `protocol` on the `encomenda` table. All the data in the column will be lost.
  - You are about to alter the column `data_nascimento` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - Added the required column `protocolo` to the `Encomenda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `condominio` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `encomenda` DROP COLUMN `protocol`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `protocolo` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `unidade` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `user` MODIFY `data_nascimento` DATETIME(3) NOT NULL;
