import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.amazon.com.br/');

  //pesquisa o livro
  await page.getByRole('searchbox', { name: 'Pesquisar Amazon.com.br' }).click();
  await page.getByRole('searchbox', { name: 'Pesquisar Amazon.com.br' }).fill('AI Engineering: Building Applications with Foundation Models');
  await page.getByRole('button', { name: 'Ir', exact: true }).click();
  await expect(page.getByRole('link', { name: 'AI Engineering: Building' })).toBeVisible();
  await page.locator('.rush-component > .a-link-normal').first().click();

  //verifica os detalhes do livro
  await expect(page.locator('#productSubtitle')).toContainText('Capa comum');
  await expect(page.locator('#bylineInfo')).toContainText('Chip Huyen');
  await expect(page.locator('#bylineInfo')).toContainText('Edição Inglês');
  await page.getByRole('button', { name: 'Outros Usado e Novo a partir' }).click();
  await page.getByRole('link', { name: 'Capa Comum a partir de R$' }).click();
  await expect(page.locator('#aod-pinned-offer')).toContainText('Novo');
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  //adiciona no carrinho
  await page.getByRole('button', { name: 'Adicionar ao carrinho', exact: true }).click();
  await expect(page.locator('#NATC_SMART_WAGON_CONF_MSG_SUCCESS')).toContainText('Adicionado ao carrinho');
  await expect(page.locator('#sw-atc-details-single-container')).toBeVisible();
});