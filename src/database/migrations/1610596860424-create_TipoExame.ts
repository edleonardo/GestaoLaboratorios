import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTipoExame1610596860424 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'TipoExame',
			columns: [
				{
					name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
					generationStrategy: 'increment'
				},
				{
					name: 'nome',
					type: 'varchar'
				},
			]
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('TipoExame')
	}
}
