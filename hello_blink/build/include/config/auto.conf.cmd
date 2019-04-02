deps_config := \
	/home/evan/Documents/controlsystems2019/esp-idf/components/app_trace/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/aws_iot/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/bt/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/driver/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/esp32/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/esp_adc_cal/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/esp_event/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/esp_http_client/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/esp_http_server/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/ethernet/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/fatfs/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/freemodbus/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/freertos/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/heap/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/libsodium/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/log/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/lwip/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/mbedtls/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/mdns/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/mqtt/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/nvs_flash/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/openssl/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/pthread/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/spi_flash/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/spiffs/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/tcpip_adapter/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/vfs/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/wear_levelling/Kconfig \
	/home/evan/Documents/controlsystems2019/esp-idf/components/bootloader/Kconfig.projbuild \
	/home/evan/Documents/controlsystems2019/esp-idf/components/esptool_py/Kconfig.projbuild \
	/home/evan/Documents/controlsystems2019/esp-idf/components/partition_table/Kconfig.projbuild \
	/home/evan/Documents/controlsystems2019/esp-idf/Kconfig

include/config/auto.conf: \
	$(deps_config)

ifneq "$(IDF_CMAKE)" "n"
include/config/auto.conf: FORCE
endif

$(deps_config): ;
