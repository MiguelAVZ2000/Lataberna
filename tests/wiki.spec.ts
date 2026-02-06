import { test, expect } from '@playwright/test';

test.describe('Integración Wiki', () => {
  test('debe navegar a la wiki y buscar una raza', async ({ page }) => {
    // 1. Ir a la home
    await page.goto('/');
    
    // 2. Click en el link de la wiki/reglas
    await page.click('text=Reglas Básicas');
    
    // 3. Verificar que estamos en la wiki
    await expect(page).toHaveURL(/.*wiki/);
    await expect(page.locator('h1')).toContainText('WIKI');

    // 4. Probar la búsqueda
    const searchInput = page.locator('input[placeholder*="Buscar"]');
    await searchInput.fill('Elfo');
    await page.keyboard.press('Enter');

    // 5. Verificar resultados de búsqueda
    await expect(page).toHaveURL(/.*search\?query=Elfo/);
    await expect(page.locator('text=Resultados de Búsqueda')).toBeVisible();
    await expect(page.locator('text=Elfo')).toBeVisible();
  });

  test('debe mostrar los detalles de una clase correctamente', async ({ page }) => {
    await page.goto('/wiki/clases');
    
    // Seleccionar la clase Guerrero (o la primera que aparezca)
    await page.click('text=Ver Detalles');
    
    // Verificar elementos clave de la página de detalle
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=Rasgos de Clase')).toBeVisible();
    await expect(page.locator('text=Bonos de Atributo')).toBeHidden(); // No debería aparecer en clases si no está configurado así
  });
});
