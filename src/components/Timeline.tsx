import {Spacer} from "./Spacer.tsx";
import {Dot} from "./Dot.tsx";
import glass from "../assets/glass.png"
import rings from "../assets/rings.png"
import cupcake from "../assets/cupcake.png"
import chair from "../assets/chair.png"
import cake from "../assets/cake.png"


export function Timeline() {
    return (
        <>
            <h1 className="text-5xl font-bold text-center">Програма</h1>
            <Spacer />
          <div className="hidden md:flex justify-center items-center">
              <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical sm:w-180">
                  <li>
                      <div className="timeline-middle">
                          <Dot />
                      </div>
                      <div className="timeline-start mb-10 md:text-end text-lg">
                          <time className="font-mono italic text-accent-content">18:00</time>
                          <div className="text-2xl font-black ">Добре дошли!</div>
                          Начало на празничния ден с освежаващи напитки и приятни моменти.
                      </div>
                      <div className="timeline-end mb-10 md:text-end text-lg">
                          <img alt="" className="" src={glass}/>
                      </div>
                      <hr />
                  </li>
                  <li>
                      <hr />
                      <div className="timeline-end md:mb-10 text-lg">
                          <time className="font-mono italic text-accent-content">18:30</time>
                          <div className="text-2xl  font-black">Граждански Брак</div>
                          Официалният момент, в който ще кажем „Да“ един на друг.
                      </div>
                      <div className="timeline-middle">
                          <Dot />
                      </div>
                      <div className="timeline-start md:mb-10 text-lg">
                          <img alt="" className="" src={rings}/>
                      </div>
                      <hr />
                  </li>
                  <li>
                      <hr />
                      <div className="timeline-middle">
                          <Dot />
                      </div>
                      <div className="timeline-start mb-10 md:text-end text-lg">
                          <time className="font-mono italic text-accent-content">19:00</time>
                          <div className="text-2xl  font-black">Поздравления и време за снимки</div>
                          Споделени емоции и незабравими кадри.
                      </div>
                      <div className="timeline-end mb-10 md:text-end text-lg">
                          <img alt="" className="" src={cupcake}/>
                      </div>
                      <hr />
                  </li>
                  <li>
                      <hr />
                      <div className="timeline-middle">
                          <Dot />
                      </div>
                      <div className="timeline-start md:mb-10 text-lg">
                          <img alt="" className="" src={chair}/>
                      </div>
                      <div className="timeline-end md:mb-10 text-lg">
                          <time className="font-mono italic text-accent-content">20:00</time>
                          <div className="text-2xl  font-black">Празнична вечеря и незабравимо веселие</div>
                          Време е за вкусни ястия, вълнуващи тостове и много танци, смях и хубави емоции!
                      </div>
                      <hr />
                  </li>
                  <li>
                      <hr />
                      <div className="timeline-middle">
                          <Dot />
                      </div>
                      <div className="timeline-start mb-10 md:text-end text-lg">
                          <time className="font-mono italic text-accent-content">23:00 </time>
                          <div className="text-2xl font-black">Торта</div>
                          Най-сладкият момент където ще се насладим на вкусна торта, празнична заря и прекрасни моменти!
                      </div>
                      <div className="timeline-end mb-10 md:text-end text-lg">
                          <img className="h-58" alt="" src={cake}/>
                      </div>
                  </li>
              </ul>
          </div>
            <div className="flex justify-center items-center md:hidden">
                <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical sm:w-180">
                    <li>
                        <div className="timeline-middle">
                            <Dot />
                        </div>
                        <div className="timeline-start mb-10 md:text-end text-lg">
                            <time className="font-mono italic text-accent-content">18:00</time>
                            <div className="text-2xl font-black ">Добре дошли!</div>
                            Начало на празничния ден с освежаващи напитки и приятни моменти.
                        </div>
                        <div className="timeline-end mb-10 md:text-end text-lg">
                            <img alt="" className="" src={glass}/>
                        </div>
                        <hr />
                    </li>
                    <li>
                        <hr />
                        <div className="timeline-start sm:timeline-end md:mb-10 text-lg">
                            <time className="font-mono italic text-accent-content">18:30</time>
                            <div className="text-2xl  font-black">Граждански Брак</div>
                            Официалният момент, в който ще кажем „Да“ един на друг.
                        </div>
                        <div className="timeline-middle">
                            <Dot />
                        </div>
                        <div className=" timeline-end md:mb-10 text-lg">
                            <img alt="" className="" src={rings}/>
                        </div>
                        <hr />
                    </li>
                    <li>
                        <hr />
                        <div className="timeline-middle">
                            <Dot />
                        </div>
                        <div className="timeline-start mb-10 md:text-end text-lg">
                            <time className="font-mono italic text-accent-content">19:00</time>
                            <div className="text-2xl  font-black">Поздравления и време за снимки</div>
                            Споделени емоции и незабравими кадри.
                        </div>
                        <div className="timeline-end mb-10 md:text-end text-lg">
                            <img alt="" className="h-50" src={cupcake}/>
                        </div>
                        <hr />
                    </li>
                    <li>
                        <hr />
                        <div className="timeline-middle">
                            <Dot />
                        </div>
                        <div className="timeline-end sm:timeline-start md:mb-10 text-lg">
                            <img alt="" className="" src={chair}/>
                        </div>
                        <div className="timeline-start sm:timeline-end md:mb-10 text-lg">
                            <time className="font-mono italic text-accent-content">20:00</time>
                            <div className="text-2xl  font-black">Празнична вечеря и незабравимо веселие</div>
                            Време е за вкусни ястия, вълнуващи тостове и много танци, смях и хубави емоции!
                        </div>
                        <hr />
                    </li>
                    <li>
                        <hr />
                        <div className="timeline-middle">
                            <Dot />
                        </div>
                        <div className="timeline-start mb-10 md:text-end text-lg">
                            <time className="font-mono italic text-accent-content">23:00 </time>
                            <div className="text-2xl font-black">Торта</div>
                            Най-сладкият момент където ще се насладим на вкусна торта, празнична заря и прекрасни моменти!
                        </div>
                        <div className="timeline-end mb-10 md:text-end text-lg">
                            <img alt="" className="h-58" src={cake}/>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}