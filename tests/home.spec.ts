import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('debe renderizar las secciones principales sin errores', async ({ page }) => {
    await page.goto('/')

    // Hero visible
    await expect(page.locator('text=TU AVENTURA')).toBeVisible()

    // No existen links rotos a rutas inexistentes
    const dadosLinks = page.locator('a[href="/dados"]')
    await expect(dadosLinks).toHaveCount(0)
    const contenidoLinks = page.locator('a[href="/contenido"]')
    await expect(contenidoLinks).toHaveCount(0)
    const comunidadLinks = page.locator('a[href="/comunidad"]')
    await expect(comunidadLinks).toHaveCount(0)

    // Features section visible
    await expect(page.locator('text=TODO LO QUE NECESITAS')).toBeVisible()

    // No hay errores de render
    await expect(page.locator('body')).not.toContainText('Error')
    await expect(page.locator('body')).not.toContainText('Internal Server Error')
  })

  test('search bar en hero debe navegar a wiki/search', async ({ page }) => {
    await page.goto('/')
    const input = page.locator('input[placeholder*="Buscar hechizos"]')
    await input.fill('Elfo')
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/.*wiki\/search\?query=Elfo/)
  })
})
