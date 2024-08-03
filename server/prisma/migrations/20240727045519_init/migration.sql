/*
  Warnings:

  - You are about to drop the column `primeiro_acesso` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `unidadeId` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `cargo` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.
  - Added the required column `condominioId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_unidadeId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `primeiro_acesso`,
    DROP COLUMN `unidadeId`,
    ADD COLUMN `condominioId` INTEGER NOT NULL,
    MODIFY `cargo` ENUM('ADMIN', 'OPERADOR') NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_condominioId_fkey` FOREIGN KEY (`condominioId`) REFERENCES `Condominio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
