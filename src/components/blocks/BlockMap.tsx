export default function BlockMap() {
    return (
        <div className="block-map block">
            <div className="block-map__body">
                <iframe
                    title="Bản Đồ"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3920.534090972642!2d106.593588!3d10.693226!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175332fb69b3417%3A0x5fd19988675c00a9!2zQ8OUTkcgVFkgVE5ISCBUTS1EViBDw4FQIFjDjUNIIEtJTSBUVeG6pE4gSMOZTkc!5e0!3m2!1svi!2s!4v1642472387967!5m2!1svi!2s"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                />
            </div>
        </div>
    );
}
