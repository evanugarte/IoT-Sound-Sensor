# IoT Sound Sensor
Using 4 ESP32s placed around the SCE club room, the microcontrollers record the noise levels to track busyness.

## Getting started
##### For Linux #####
1. Install the required package to compile with esp-idf.  
Terminal command: `sudo apt-get install git wget make libncurses-dev flex bison gperf python python-serial`     
**Note:** one or more of these packages may fail to install. Should that happen, perform a `sudo apt-get update` and try again. 

2. Download and install the xtensa-esp32-elf toolchain. 
- 64 bit version: https://dl.espressif.com/dl/xtensa-esp32-elf-linux64-1.22.0-80-g6c4433a-5.2.0.tar.gz 
- 32 bit version can be found here: https://dl.espressif.com/dl/xtensa-esp32-elf-linux32-1.22.0-80-g6c4433a-5.2.0.tar.gz. *Clicking on this link will download the zipped file to your default Downloads directory.* 

3. Navigate to the `SmartNoiseSense` directory and install the zip file.
For linux users, this will be:
> `tar -xzf ~/Downloads/xtensa-esp32-elf-linux64-1.22.0-80-g6c4433a-5.2.0.tar.gz`

For WSL users, this will be:
> `tar -xzf ~/../../mnt/c/Users/(your Windows username)/Downloads/xtensa-esp32-elf-linux64-1.22.0-80-g6c4433a-5.2.0.tar.gz`.

3. Set your PATH variables in `.profile` to add the esp-idf and xtensa toolchain paths. In the terminal you can find the file with:
`cd ~`     
`ls -a`     
**Example lines:**  
`export PATH=$PATH:$HOME/Documents/SmartSoundSense/xtensa-esp32-elf/bin`  
`export IDF_PATH=~/Documents/SmartSoundSense/esp-idf`     
Once you update the paths, enter the command `source ~/.profile` for the changes to take effect.

4. Confirm you correctly set your PATH variables by entering either the command `echo $PATH` or `printenv $PATH`. You should see a long list of file paths with the path you just created at the end of it. Do the same commands for `IDF_PATH`.

5. Inside the `hello_blink` directory, enter `make menuconfig`. This should open the ESP32 toolchain configuration menu. Navigate to Serial Flasher config -> Default Serial Port and change this value to the usb port that your ESP32 is connected to. 
**Note:** If you are using Windows, you will need to determine which COM port your ESP32 is connected to, and use the linux naming configuration. For example, if your ESP32 is connected to COM4, you would enter /dev/ttyS4. 

6. Once done, save and exit the configuration menu. Run the command `make flash` flash `hello_blink` onto your ESP32. When the flashing has finished, run the command `make monitor` to see the output. Press `ctrl+]` to exit.
