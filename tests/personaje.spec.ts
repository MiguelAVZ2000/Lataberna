import { test, expect } from '@playwright/test';

test.describe('Integración Creador de Personajes', () => {
  test('debe completar el flujo básico de creación hasta el resumen', async ({ page }) => {
    // 1. Iniciar creador
    await page.goto('/personaje');
    
    // Paso 1: Raza
    await expect(page.locator('text=1. Elige tu Raza')).toBeVisible();
    await page.click('text=Humano'); // Seleccionar Humano
    await page.click('text=Siguiente');
    
    // Paso 2: Clase
    await expect(page.locator('text=2. Elige tu Clase')).toBeVisible();
    await page.click('text=Guerrero'); // Seleccionar Guerrero
    await page.click('text=Siguiente');
    
    // Paso 3: Atributos
    await expect(page.locator('text=3. Atributos')).toBeVisible();
    await page.click('text=Tirar Dados (4d6)'); // Botón de azar
    await page.click('text=Siguiente');
    
    // Paso 4: Trasfondo
    await expect(page.locator('text=4. Elige tu Trasfondo')).toBeVisible();
    await page.click('text=Soldado');
    await page.click('text=Siguiente');
    
    // Paso 5: Detalles
    await expect(page.locator('text=5. Detalles del Héroe')).toBeVisible();
    await page.fill('placeholder=Ej: Thorin', 'Test Hero');
    await page.click('text=Siguiente');
    
    // Paso 6: Equipo
    await expect(page.locator('text=4. Equipo de Aventurero')).toBeVisible();
    await page.click('text=Espada larga');
    await page.click('text=Siguiente');
    
    // Paso 7: Resumen
    await expect(page.locator('text=6. Resumen de tu Héroe')).toBeVisible();
    await expect(page.locator('h1')).toContainText('TEST HERO');
    await expect(page.locator('text=HUMANO GUERRERO')).toBeVisible();
    
    // Verificar que el botón de exportar PDF está presente
    await expect(page.locator('text=Exportar Ficha PDF')).toBeVisible();
  });
});
