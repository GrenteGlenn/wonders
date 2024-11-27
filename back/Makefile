SEQUELIZE=npx sequelize-cli
JEST=npx jest

.PHONY: start start-activities start-quiz start-countries start-users

start: start-activities start-quiz


start-activities:
	@echo "start activities microservice"
	cd activities_wonders/ && npm start

start-quiz:
	@echo "start quiz microservice"
	cd quiz_wonders/ && npm start

start-countries:
	@echo "start counteries microservice"
	cd countries/ && npm start

start-users:
	@echo "start users microservice"
	cd users_wonders/ && npm start
