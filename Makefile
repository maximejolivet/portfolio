.PHONY: install dev build generate preview deploy lint lintfix prettier prettier-fix test icons clean infos

infos:
	@echo "Projet    : $$(node -p "require('./package.json').name")"
	@echo "Version   : $$(node -p "require('./package.json').version")"
	@echo "Node requis : $$(node -p "require('./package.json').engines.node")"
	@echo "Node actuel : $$(node -v)"
	@echo "Branche   : $$(git rev-parse --abbrev-ref HEAD)"
	@echo "Dernier commit : $$(git log -1 --format='%h %s')"
	@echo ""
	@echo "Commandes disponibles :"
	@echo "  install       Installer les dépendances"
	@echo "  dev           Lancer le serveur de dev (http://localhost:8000)"
	@echo "  build         Build SSR"
	@echo "  generate      Build statique (utilisé pour le déploiement)"
	@echo "  preview       Prévisualiser un build généré"
	@echo "  deploy        Build + generate en une étape"
	@echo "  lint          Vérifier le code avec ESLint"
	@echo "  lintfix       Corriger automatiquement (ESLint --fix + Prettier)"
	@echo "  prettier      Vérifier le formatage"
	@echo "  prettier-fix  Corriger le formatage"
	@echo "  test          Lancer les tests (vitest)"
	@echo "  icons         Régénérer le subset d'icônes iconify"
	@echo "  clean         Supprimer .nuxt, .output et node_modules"
	@echo "  infos         Afficher ces informations"

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
