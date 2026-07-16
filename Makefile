.PHONY: install dev build generate preview deploy lint lintfix test clean

install:
	npm install

dev:
	npm run dev

build:
	npm run build

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

test:
	npm run test

clean:
	rm -rf .nuxt .output node_modules
