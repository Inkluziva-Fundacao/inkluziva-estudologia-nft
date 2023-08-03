# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

#Documentação: Testes para Certificado NFT usando Mocha/Jest
##Este documento descreve a implementação e os testes para o contrato de Certificado NFT utilizando os frameworks Mocha e Jest.

##Descrição Geral
Os testes foram implementados usando os frameworks Mocha e Jest para verificar o funcionamento correto do contrato Certificado NFT. Os testes abrangem várias funcionalidades do contrato, incluindo implantação, criação de certificados, transferência de propriedade e URI personalizado para tokens.

##Pré-requisitos
Certifique-se de ter as seguintes dependências instaladas:

Node.js
Mocha (ou Jest)
Chai (ou Jest com asserções adequadas)
Estrutura do Código
O código de teste é organizado da seguinte forma:

#Arquivo de Teste (CertificadoNFT.test.js): Contém testes Mocha/Jest para o contrato Certificado NFT.
##Testes Implementados
#1. Teste de Implantação
Testa a implantação bem-sucedida do contrato Certificado NFT e verifica se o endereço do contrato segue o formato de endereço Ethereum.

#2. Teste de Saldo Antes da Criação
Verifica se o saldo do proprietário está igual a 0 antes da criação de qualquer certificado.

#3. Teste de Saldo Após a Primeira Criação
Cria um certificado e verifica se o saldo do proprietário é igual a 1 após a criação.

#4. Teste de Saldo Após a Segunda Criação
Cria dois certificados e verifica se o saldo do proprietário é igual a 2 após a criação.

#5. Teste de Proprietário do Token
Cria dois certificados e verifica se o proprietário possui ambos os tokens.

#6. Teste de Transferência de Token
Cria um certificado e transfere a propriedade para outra conta. Verifica se o saldo da outra conta é igual a 1.

#7. Teste de URI do Token
Define URI personalizado para dois tokens e verifica se os URIs foram configurados corretamente.

Executando os Testes
Certifique-se de que o ambiente de desenvolvimento esteja configurado corretamente.

Abra um terminal na pasta raiz do projeto.

Execute o seguinte comando para executar os testes: