'use client'
import { useContext } from "react"
import Modal from "./modal"
import { ModalContext } from "@/context/modalContext"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import "../../styles/components/modals/carImageModal.sass"
import Button from "../button/button";
import { TbZoomInFilled, TbZoomOutFilled, TbZoomReset } from "react-icons/tb";

const CarImageModal = () => {
    const {carImageModal, carImage} = useContext(ModalContext)

    if(!carImageModal){
        return <></>
    }
    return(
        <Modal className="car-image-modal" title="Imagem do veículo">
            <figure className="figure-modal">
            <TransformWrapper>
                {
                    ({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                    <>
                        <div className="tools">
                            <Button Style="brand-opacity" onClick={() => zoomIn()}>
                                <TbZoomInFilled/>
                            </Button>
                            <Button Style="brand-opacity" onClick={() => zoomOut()}>
                                <TbZoomOutFilled/>
                            </Button>
                            <Button Style="brand-opacity" onClick={() => resetTransform()}>
                                <TbZoomReset/>
                            </Button>
                        </div>
                        <TransformComponent>
                            <img src={carImage} />
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>
            </figure>
        </Modal>
    )
}

export default CarImageModal