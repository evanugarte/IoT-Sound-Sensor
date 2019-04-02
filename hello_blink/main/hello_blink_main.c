/* Hello World Example

   This example code is in the Public Domain (or CC0 licensed, at your option.)

   Unless required by applicable law or agreed to in writing, this
   software is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
   CONDITIONS OF ANY KIND, either express or implied.
*/
#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_system.h"
#include "esp_spi_flash.h"
#include "driver/gpio.h"

#define BLINK_GPIO 2

void read_sound(void *pvParam)
{
    while(1){
        printf("Hello world!\n");
        for(int i = 10; i > 0; i--)
        {
            printf("%d...\n", i);
            vTaskDelay(1000 / portTICK_PERIOD_MS);
        }
        printf("Blast off!.\n");
    }
}

void blink(void *pvParam)
{
    gpio_pad_select_gpio(BLINK_GPIO);
    /* specify for this GPIO we only want output */ 
    gpio_set_direction(BLINK_GPIO, GPIO_MODE_OUTPUT);
    while(1)
    {
        // printf("WHAT");
        gpio_set_level(BLINK_GPIO, 0);
        vTaskDelay(100 / portTICK_PERIOD_MS);
        gpio_set_level(BLINK_GPIO, 1);
        vTaskDelay(100 / portTICK_PERIOD_MS);
    }
}

void app_main()
{
    // nvs_flash_init();
    xTaskCreate(&read_sound, "read_sound", 2048, NULL, 5, NULL);
    xTaskCreate(&blink, "blink", 2048, NULL, 5, NULL);
}
