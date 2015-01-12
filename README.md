##react-select2

React component for select2

## Usage
    var options = [{
        id: 1,
        name: 'JavaScript'
    },{
        id: 2,
        name: 'Ruby'
    },{
        id: 3,
        name: 'Perl'
    }];

    <Select2 defaultValue='3'>
        { options.map(opt => 
            <option key={opt.id} value={opt.id}>
                {opt.name}
            </option>
        ) }
    </Select2>
