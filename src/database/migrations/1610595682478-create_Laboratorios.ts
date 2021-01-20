import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createLaboratorios1610595682478 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'Laboratorios',
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
					name: 'endereco',
					type: 'text'
				},
				{
					name: 'ativo',
					type: 'boolean',
          default: true
				}
			]
		}))
	}
	
  public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('Laboratorios')
  }
}
