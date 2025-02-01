import { Divider, Stack } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

const LearnerApplication = () => {
  return (
    <div>
         <div>
                      <div className=" flex flex-col mt-4 items-center gap-4 md:flex-row">
                        <div>
                          <h1 className="text-casbDisabled">Program</h1>
                          <p className="font-semi-bold">Data Science</p>
                        </div>
                        <Divider orientation="vertical" height="40px" mx={4} />
                        <div>
                          <h1 className="text-casbDisabled">Date registered</h1>
                          <p className="font-semi-bold">2024/11/16</p>
                        </div>
                        <Divider orientation="vertical" height="40px" mx={4} />
        
                        <div>
                          <h1 className="text-casbDisabled">Status</h1>
                          <p className="font-semi-bold">Registered</p>
                        </div>
                        <Divider orientation="vertical" height="40px" mx={4} />
        
                        <div>
                          <h1 className="text-casbDisabled">Paid</h1>
                          <p className="font-semi-bold">$150.00</p>
                        </div>
                      </div>
                      <Divider
                        orientation="horizontal"
                        height="40px"
                        mx={1}
                        className="mb-8"
                      />
                      <div className="flex items-center justify-center bg-white md:justify-start mt-4">
                        <Stack
                          direction={{ base: "column", md: "row" }} // Vertical on mobile, horizontal on larger screens
                          spacing={4} // Adds space between buttons
                          align="stretch" // Ensures buttons stretch to fill the container
                        >
                          <button className="border border-casbDisabled px-6 py-3 rounded-sm">
                            PowerBI
                          </button>
                          <button className="border border-casbSeaBlueSecondary px-6 py-3 rounded-sm">
                            Python
                          </button>
                          <button className="border border-casbSuccess px-6 py-3 rounded-sm">
                            Excel
                          </button>
                          <button className="border border-casbError px-6 py-3 rounded-sm">
                            Tableau
                          </button>
                          {/* Add more buttons here in the future */}
                        </Stack>
                      </div>
                      {/* Two buttons */}
                      <div className="flex flex-col md:flex-row items-center justify-start gap-4 mt-8">
                        <div className="flex items-center justify-center  cursor-pointer text-black py-3 rounded w-52 bg-casbGreyPrimary">
                          <button type="submit" className=" ">
                            Home
                          </button>
                          <Image
                            src="/chevron.png"
                            alt="chevron"
                            width={20}
                            height={20}
                            className="text-white"
                          />
                        </div>
                        <div className="flex items-center justify-center  cursor-pointer text-white py-3 rounded w-72 bg-casbBluePrimary">
                          <button type="submit" className=" ">
                            Start new application
                          </button>
                          <Image
                            src="/chevron-right-white.png"
                            alt="chevron"
                            width={20}
                            height={20}
                            className="text-white"
                          />
                        </div>
                      </div>
                    </div>
    </div>
  )
}

export default LearnerApplication