export default function OrgStruct({struct, onClick, selectedId}) {
    let clx = ''
    if (selectedId === struct.id){
        console.log('test')
        clx = 'dBlockSelected'
    }
    return (
        <div className={'d-flex flex-column gap-2' }>
            <div>
                <div className={'dBlock ' + clx} onClick={() => onClick(struct)}>
                    {struct.name}
                </div>
            </div>
            <div className={'flex-row d-flex gap-2'}>
                {struct.children.map((item, index) => {
                    return <OrgStruct key={index} struct={item} onClick={onClick} selectedId={selectedId}/>
                })}
            </div>
        </div>
    )
}