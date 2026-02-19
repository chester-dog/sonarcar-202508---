music.set_tempo(400)
triggered = 0
ypos = 4
radio.set_group(240)
serial.redirect_to_usb()

def on_forever():
    global triggered, ypos
    led.unplot(2, ypos)
    triggered = Math.round(sensors.sensor_ping(DigitalPin.P1, DigitalPin.P2, sensors.PingUnit.CENTIMETERS))
    basic.pause(triggered * 1.5)
    music.play_tone(784, music.beat(BeatFraction.SIXTEENTH))
    ypos = 7 - triggered
    serial.write_value("x", ypos)
    if ypos <= 0:
        ypos = 0
    elif ypos >= 4:
        ypos = 4
        radio.send_number(0)
    elif ypos < 2.5:
        radio.send_number(1)
        serial.write_line("here")
    else:
        radio.send_number(0)
    led.plot(2, ypos)
basic.forever(on_forever)
