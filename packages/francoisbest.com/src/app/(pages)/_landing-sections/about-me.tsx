import Image from 'next/image'
import { BrowserWindowFrame } from 'ui/components/browser-window-frame'
import { WideContainer } from 'ui/layouts/wide-container'
import grenobleImg from './grenoble-640@2x.png'
import balkansTourLightImg from './balkans-tour-2019-light.jpg'
import balkansTourDarkImg from './balkans-tour-2019-dark.jpg'

export function AboutMe() {
  return (
    <>
      <WideContainer>
        <Image
          src={grenobleImg}
          alt="A view of Grenoble surrounded by mountains, taken from the Bastille."
        />
      </WideContainer>

      <p>
        I live in Grenoble, in the French Alps, with my wife and our sons.
      </p>
      <p>
        My hobbies vary a lot based on my current interests, but playing music
        (piano/synths & guitar) is always a constant. I'm currently learning
        woodworking to build toys for my kids, and take sunrise hikes to enjoy
        the surrounding mountains.
      </p>
      <p>
        I also love cycling, both for transportation and tourism. With my
        friends, I've toured across 7 countries on my bike, along the French
        Atlantic coast, in the Alps and in the Balkans:
      </p>

      <BrowserWindowFrame className="block dark:hidden" url="https://stravels.io">
        <Image src={balkansTourLightImg} alt="" />
      </BrowserWindowFrame>

      <BrowserWindowFrame className="hidden dark:block" url="https://stravels.io">
        <Image src={balkansTourDarkImg} alt="" />
      </BrowserWindowFrame>

      <p>
        This is a screenshot of a progressive web app I made for us to track our
        journeys, it's called <a href="https://stravels.io">Stravels</a> and
        allowed us to stitch together our Strava activities onto a map.
      </p>
    </>
  )
}
