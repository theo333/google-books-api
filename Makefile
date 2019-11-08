.PHONY: lint

lint:
	./node_modules/.bin/prettier --loglevel error 'bin/*.js' --write
	./node_modules/.bin/prettier --loglevel error 'src/*.js' --write
	./node_modules/.bin/eslint ./bin --fix
	./node_modules/.bin/eslint ./src --fix
