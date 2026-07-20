.PHONY: install dev build generate preview deploy lint lintfix prettier prettier-fix test icons clean

install:
	npm install

dev:
	npm run dev

build:
	npm run build

icons:
	npm run icons:generate

generate:
	npm run generate

preview:
	npm run preview

deploy:
	npm run deploy

lint:
	npm run lint

lintfix:
	npm run lintfix

prettier:
	npm run prettier

prettier-fix:
	npm run prettier:fix

test:
	npm run test

clean:
	rm -rf .nuxt .output node_modules
