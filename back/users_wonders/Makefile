SEQUELIZE=npx sequelize-cli
JEST=npx jest

.PHONY: db-all db-migrate-undo-all db-migrate db-seed-all unit-test db-and-tests start-swagger

db-all: db-migrate-undo-all db-migrate db-seed-all

db-and-tests : db-all unit-test

show-swagger:
	@echo "swagger creation"
	@npm start swagger

db-migrate-undo-all:
	@echo "Undoing all migrations..."
	$(SEQUELIZE) db:migrate:undo:all

db-migrate:
	@echo "Running migrations..."
	$(SEQUELIZE) db:migrate

db-seed-all:
	@echo "Seeding database..."
	$(SEQUELIZE) db:seed:all

unit-test: 
	@echo "Controllers tests..."
	$(JEST)