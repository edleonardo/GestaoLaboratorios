import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createExames1610595711859 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'Exames',
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
					type: 'varchar',
					isUnique: true
				},
				{
					name: 'tipoExame_id',
					type: 'integer'
				},
				{
					name: 'ativo',
					type: 'boolean',
          default: true
				}
			],
			foreignKeys: [
				{
					name: 'ExameTipo',
          columnNames: ['tipoExame_id'],
          referencedTableName: 'TipoExame',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
				}
			]
		}))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('Exames')
  }
}
