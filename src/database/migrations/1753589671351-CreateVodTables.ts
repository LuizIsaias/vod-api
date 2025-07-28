import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateVodTables1690000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "vod_categories",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "text",
          },
          {
            name: "xtream_category_id",
            type: "integer",
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "vod_items",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "xtream_vod_id",
            type: "integer",
          },
          {
            name: "title_original",
            type: "text",
          },
          {
            name: "title_normalized",
            type: "text",
          },
          {
            name: "category_id",
            type: "integer",
          },
          {
            name: "stream_icon",
            type: "text",
            isNullable: true,
          },
          {
            name: "added_at_xtream",
            type: "text",
          },
          {
            name: "container_extension",
            type: "text",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["category_id"],
            referencedTableName: "vod_categories",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("vod_items");
    await queryRunner.dropTable("vod_categories");
  }
}
