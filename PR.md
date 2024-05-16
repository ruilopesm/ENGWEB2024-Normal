# ENGWEB2024-Normal

# Dataset

Uma vez que, posteriormente, se vai usar uma base de dados mongodb e o dataset se encontra em formato .csv, foi necessário recorrer a um conversor para tal. Neste caso, utilizei o conversor online [https://csvjson.com](https://csvjson.com).

O resultado dessa conversão pode ser encontrado em `data/contratos_final.json`.

Após uma análise cuidadosa do dataset final, foi possívle perceber que nem sempre existiam consistências no atributo `precoContratual` de um objeto. Para resolver este problema, foi necessário escrever um script em Python que corrigisse os valores do tal atributo, transformando-os sempre num número com a devida representação decimal. O script pode ser encontrado em `data/prepare.py`. Além disso, todas as ocorrências de `idcontrato` foram substituídas por `_id`.

# Importação para a base de dados

Primeiramente, criou-se um container para a mesma:
```bash
docker run -d -p 27017:27017 --name contratos mongo
```

De seguida, importou-se o dataset para a base de dados:
```bash
docker cp data/contratos_final.json contratos:/contratos_final.json
docker exec -it contratos mongoimport -d contratos -c contratos --type json --file contratos_final.json --jsonArray
```

# Queries

As queries solicitadas podem ser encontradas no ficheiro `ex1/queries.txt`.

# Ex1

Para colocar a API do primeiro exercício a correr, basta executar os seguintes comando, tendo em conta que a base de dados já se deve encontrar a correr:
```bash
npm install
npm start
```

## Testes à API

É possível encontrar uma série de testes realizados à API na diretoria `ex1/ex1-testes`. Estes testes foram desenvolvidos com recurso à ferramente [Bruno](https://www.usebruno.com).

# Ex2

Para colocar o frontend do segundo exercício a correr, basta executar os seguintes comando:
```bash
npm install
npm start
```

# Docker

A forma mais simples de correr as diversas componentes do projeto é através do Docker. Para tal, basta executar o seguinte comando, na raíz do repositório:
```bash
docker-compose up --build
```
