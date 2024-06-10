/*
  Warnings:

  - You are about to drop the column `unitId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `birth_date` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `first_acess` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `unitId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `condo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `unit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `unidadeId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_nascimento` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primeiro_acesso` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unidadeId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_unitId_fkey`;

-- DropForeignKey
ALTER TABLE `unit` DROP FOREIGN KEY `Unit_condoId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_unitId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `unitId`,
    ADD COLUMN `unidadeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `birth_date`,
    DROP COLUMN `first_acess`,
    DROP COLUMN `name`,
    DROP COLUMN `password`,
    DROP COLUMN `role`,
    DROP COLUMN `unitId`,
    ADD COLUMN `cargo` ENUM('USER', 'ADMIN', 'OPERADOR') NOT NULL DEFAULT 'USER',
    ADD COLUMN `data_nascimento` VARCHAR(191) NOT NULL,
    ADD COLUMN `nome` VARCHAR(191) NOT NULL,
    ADD COLUMN `primeiro_acesso` VARCHAR(191) NOT NULL,
    ADD COLUMN `senha` VARCHAR(191) NOT NULL,
    ADD COLUMN `unidadeId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `condo`;

-- DropTable
DROP TABLE `unit`;

-- CreateTable
CREATE TABLE `Condominio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `razao_social` VARCHAR(191) NOT NULL,
    `logradouro` VARCHAR(191) NOT NULL,
    `numero_endereco` VARCHAR(191) NOT NULL,
    `complemento` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `localidade` VARCHAR(191) NOT NULL,
    `uf` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Unidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bloco` VARCHAR(191) NOT NULL,
    `unidade` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `condominioId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Unidade` ADD CONSTRAINT `Unidade_condominioId_fkey` FOREIGN KEY (`condominioId`) REFERENCES `Condominio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_unidadeId_fkey` FOREIGN KEY (`unidadeId`) REFERENCES `Unidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_unidadeId_fkey` FOREIGN KEY (`unidadeId`) REFERENCES `Unidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
