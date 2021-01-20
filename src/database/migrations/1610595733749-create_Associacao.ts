import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createAssociacao1610595733749 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'Associacao',
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
					name: 'exame_id',
					type: 'integer'
				},
				{
					name: 'laboratorio_id',
					type: 'integer'
				}
			],
			foreignKeys: [
				{
					name: 'AssociacaoExame',
          columnNames: ['exame_id'],
          referencedTableName: 'Exames',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
				},
				{
					name: 'AssociacaoLaboratorio',
          columnNames: ['laboratorio_id'],
          referencedTableName: 'Laboratorios',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
				}
			]
		}))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('Associacao')
  }
}
