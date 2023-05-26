-- CreateTable
CREATE TABLE "accounts" (
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alchemical_items" (
    "id" VARCHAR(255) NOT NULL,
    "item_id" VARCHAR(255),
    "brew_price" INTEGER NOT NULL,
    "brew_time" VARCHAR(255) NOT NULL,
    "effects" TEXT NOT NULL,

    CONSTRAINT "alchemical_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characters" (
    "id" VARCHAR(255) NOT NULL,
    "level" INTEGER NOT NULL,
    "experience" INTEGER NOT NULL,
    "character_points" INTEGER NOT NULL,
    "account_id" VARCHAR(255) NOT NULL,
    "creature_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content_children" (
    "parentId" VARCHAR(255) NOT NULL,
    "childId" VARCHAR(255) NOT NULL
);

-- CreateTable
CREATE TABLE "contents" (
    "id" VARCHAR(255) NOT NULL,
    "ownerId" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "icon" VARCHAR(255),
    "cover" VARCHAR(255),
    "properties" JSONB NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creatures" (
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "icon" VARCHAR(255) NOT NULL,
    "alignment" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "gold" INTEGER NOT NULL,
    "status_effects" JSONB NOT NULL,
    "hp" INTEGER NOT NULL,
    "mp" INTEGER NOT NULL,
    "strength" INTEGER NOT NULL,
    "dexterity" INTEGER NOT NULL,
    "constitution" INTEGER NOT NULL,
    "intelligence" INTEGER NOT NULL,
    "wisdom" INTEGER NOT NULL,
    "charisma" INTEGER NOT NULL,

    CONSTRAINT "creatures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipments" (
    "id" VARCHAR(255) NOT NULL,
    "item_id" VARCHAR(255),
    "creature_id" VARCHAR(255) NOT NULL,
    "slot_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "equipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gems" (
    "id" VARCHAR(255) NOT NULL,
    "item_id" VARCHAR(255),
    "magic_tier" INTEGER NOT NULL,

    CONSTRAINT "gems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventories" (
    "id" VARCHAR(255) NOT NULL,
    "size" INTEGER NOT NULL,
    "space_in_use" INTEGER DEFAULT 0,
    "creature_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "inventories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_item" (
    "id" VARCHAR(255) NOT NULL,
    "inventory_id" VARCHAR(255),
    "item_id" VARCHAR(255),
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "inventory_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "sub_type" VARCHAR(255),
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "rarity" VARCHAR(255) NOT NULL,
    "charges" INTEGER DEFAULT 0,
    "requirements" JSONB,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shields_armors" (
    "id" VARCHAR(255) NOT NULL,
    "item_id" VARCHAR(255),
    "damage_reduction" JSONB NOT NULL,
    "properties" JSONB NOT NULL,
    "initiative_modifier" INTEGER NOT NULL,

    CONSTRAINT "shields_armors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "torch_registries" (
    "id" VARCHAR(255) NOT NULL,
    "item_id" VARCHAR(255),
    "charges" INTEGER NOT NULL,
    "is_lit" BOOLEAN NOT NULL,

    CONSTRAINT "torch_registries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weapons" (
    "id" VARCHAR(255) NOT NULL,
    "item_id" VARCHAR(255),
    "damage" JSONB NOT NULL,
    "properties" JSONB NOT NULL,
    "initiative_modifier" INTEGER NOT NULL,
    "distance" INTEGER NOT NULL,

    CONSTRAINT "weapons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_unique" ON "accounts"("email");

-- AddForeignKey
ALTER TABLE "alchemical_items" ADD CONSTRAINT "alchemical_items_item_id_foreign" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_account_id_foreign" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_creature_id_foreign" FOREIGN KEY ("creature_id") REFERENCES "creatures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "content_children" ADD CONSTRAINT "content_children_childid_foreign" FOREIGN KEY ("childId") REFERENCES "contents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "content_children" ADD CONSTRAINT "content_children_parentid_foreign" FOREIGN KEY ("parentId") REFERENCES "contents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "equipments" ADD CONSTRAINT "equipments_creature_id_foreign" FOREIGN KEY ("creature_id") REFERENCES "creatures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "equipments" ADD CONSTRAINT "equipments_item_id_foreign" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gems" ADD CONSTRAINT "gems_item_id_foreign" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_creature_id_foreign" FOREIGN KEY ("creature_id") REFERENCES "creatures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inventory_item" ADD CONSTRAINT "inventory_item_inventory_id_foreign" FOREIGN KEY ("inventory_id") REFERENCES "inventories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inventory_item" ADD CONSTRAINT "inventory_item_item_id_foreign" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shields_armors" ADD CONSTRAINT "shields_armors_item_id_foreign" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "torch_registries" ADD CONSTRAINT "torch_registries_item_id_foreign" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "weapons" ADD CONSTRAINT "weapons_item_id_foreign" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
