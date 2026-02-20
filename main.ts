radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 987654321) {
        mode = 0
    } else if (receivedNumber == 123456789) {
        mode = 1
    } else if (receivedNumber == 10231023) {
        mode = 2
    }
})
function stopTwoWheels () {
    if (wheelStatus == 0) {
        return
    }
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P15, 0)
    pins.analogWritePin(AnalogPin.P16, 0)
    wheelStatus = 0
}
function backwardToTheLeft () {
    if (wheelStatus == 4) {
        return
    }
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P14, 1023)
    pins.analogWritePin(AnalogPin.P15, 0)
    pins.analogWritePin(AnalogPin.P16, 400)
    wheelStatus = 4
}
input.onButtonPressed(Button.A, function () {
    mode = 1
    pins.digitalWritePin(DigitalPin.P0, 1)
    pins.digitalWritePin(DigitalPin.P12, 1)
})
input.onLogoEvent(TouchButtonEvent.Released, function () {
    pins.servoWritePin(AnalogPin.P8, 0)
})
function backward () {
    if (wheelStatus == 2) {
        return
    }
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P14, 1023)
    pins.analogWritePin(AnalogPin.P15, 0)
    pins.analogWritePin(AnalogPin.P16, 1023)
    wheelStatus = 2
}
function sound (num: number) {
    if (currentStatus == num) {
        return
    } else if (num == 0) {
        music.startMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once)
    } else if (num == 1) {
        music.playTone(784, music.beat(BeatFraction.Half))
    } else if (num == 2) {
        music.startMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once)
    } else if (num == 3) {
        music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
    } else if (num == 4) {
        music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
    } else if (num == 5) {
        music.startMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once)
    }
    currentStatus = num
}
function spin () {
    if (wheelStatus == 5) {
        return
    }
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P14, 1023)
    pins.analogWritePin(AnalogPin.P15, 1023)
    pins.analogWritePin(AnalogPin.P16, 0)
    wheelStatus = 5
}
input.onButtonPressed(Button.AB, function () {
    mode = 2
})
input.onButtonPressed(Button.B, function () {
    mode = 0
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P12, 0)
})
function forward () {
    if (wheelStatus == 1) {
        return
    }
    pins.analogWritePin(AnalogPin.P13, 1023)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P15, 1023)
    pins.analogWritePin(AnalogPin.P16, 0)
    wheelStatus = 1
}
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    pins.servoWritePin(AnalogPin.P8, 180)
})
function backwardToTheRight () {
    if (wheelStatus == 3) {
        return
    }
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P14, 400)
    pins.analogWritePin(AnalogPin.P15, 0)
    pins.analogWritePin(AnalogPin.P16, 1023)
    wheelStatus = 3
}
let triggered = 0
let currentStatus = 0
let mode = 0
let wheelStatus = 0
radio.setGroup(302)
music.setTempo(100)
let ypos = 4
wheelStatus = 0
mode = 0
basic.forever(function () {
    sound(wheelStatus)
    basic.pause(100)
    pins.digitalWritePin(DigitalPin.P0, 1)
})
control.inBackground(function () {
    while (true) {
        triggered = Math.round(sonar.ping(
        DigitalPin.P1,
        DigitalPin.P2,
        PingUnit.Centimeters
        ))
        if (mode == 1) {
            forward()
            if (triggered > 0 && triggered < 30) {
                basic.showIcon(IconNames.EighthNote)
                backwardToTheLeft()
                basic.pause(1000)
            }
        } else if (mode == 0) {
            stopTwoWheels()
        } else if (mode == 2) {
            spin()
        }
        basic.pause(100)
        basic.clearScreen()
    }
})
