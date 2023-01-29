import React, { useEffect, useState } from 'react'
import './covid.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcaseMedical, faVirusCovid, faSkullCrossbones, faTruckMedical } from "@fortawesome/free-solid-svg-icons";

function Covid() {

    const [data, setData] = useState({})
    const [date, setDate] = useState()

    const getCovidData = async () => {
        try {
            const res = await fetch('https://data.covid19india.org/data.json')
            const actualData = await res.json()
            setData(actualData.statewise[0])

            setDate(actualData.statewise[0].lastupdatedtime.split(" ")[0])

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCovidData()
    }, [])

    return (
        <>
            <h1 className='live'>🔴 LIVE</h1>
            <div class="header">
                <h2 className='title'>COVID-19 CORONAVIRUS TRACKER</h2>
                <div class="image-container">
                    <img id="#covid-19" class="image" src="./img/covid.png" />
                    <span class="shadow"></span>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-sm-6">
                        <div className="card-box bg-blue">
                            <div className="inner">
                                <p>OUR <span>COUNTRY</span></p>
                                <h3> INDIA </h3>
                            </div>
                            <div className="icon">
                                <i class="fa fa-flag" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="card-box bg-green">
                            <div className="inner">
                                <p>TOTAL <span>RECOVERED</span></p>
                                <h3> {data.recovered} </h3>
                            </div>
                            <div className="icon">
                                <FontAwesomeIcon icon={faBriefcaseMedical}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="card-box bg-orange">
                            <div className="inner">
                                <p>TOTAL <span>CONFIRMED</span></p>
                                <h3> {data.confirmed} </h3>
                            </div>
                            <div className="icon">
                                <FontAwesomeIcon icon={faVirusCovid}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="card-box bg-red">
                            <div className="inner">
                                <p>TOTAL <span>DEATHS</span></p>
                                <h3> {data.deaths} </h3>
                            </div>
                            <div className="icon">
                                <FontAwesomeIcon icon={faSkullCrossbones}/>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="card-box bg-darkblue">
                            <div className="inner">
                                <p>TOTAL <span>ACTIVE</span></p>
                                <h3> {data.active} </h3>
                            </div>
                            <div className="icon">
                                <i className="fa fa-users"></i>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="card-box bg-yellow">
                            <div className="inner">
                                <p>LAST <span>UPDATED</span></p>
                                <h3> {date} </h3>
                            </div>
                            <div className="icon">
                                <FontAwesomeIcon icon={faTruckMedical}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Covid