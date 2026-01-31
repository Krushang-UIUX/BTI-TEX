const valveProducts = [
    {
        id: "gate-valves",
        category: "gate",
        title: "Gate Valves",
        subtitle: "API 600 | API 6D",
        image: "./bti_valves/gate_valve_new.png",
        specs: [
            "Material: CI | CS | SS | AS | WCB | LCB | WC6 | WC9",
            "Ends: Screwed | BSP | BSPT | NPT | Socket Weld | Butt Weld | Flanged | RTJ",
            "Pressure: ASA 125# | 150# | 300# | 400# | 600# | 900# | 1500# | 2500#",
            "Size: 25mm to 1200mm"
        ],
        description: "Operation: Manual | Gear and Electrical Actuated. High-performance gate valves designed for robust isolation in industrial pipelines."
    },
    {
        id: "globe-valves",
        category: "globe",
        title: "Globe Valves",
        subtitle: "BS-1873 | ND-16 | ND-40",
        image: "./bti_valves/globe_valve_new.png",
        specs: [
            "Material: CI | CS | SS | AS | LCB | WC6 | WC9",
            "Ends: Screwed | BSP | BSPT | NPT | Socket Weld | Butt Weld | Flanged | RTJ",
            "Pressure: ASA 125# | 150# | 300# | 600# | 900# | 1500# | 2500# | PN 16 | PN 40 | PN 64",
            "Size: 15mm to 1000mm"
        ],
        description: "Operation: Manual | Gear and Electrical Actuated. Precision globe valves optimized for throttling and frequent operation."
    },
    {
        id: "ball-valves",
        category: "ball",
        title: "Ball Valves",
        subtitle: "Floating & Trunion Mounted | API-6D | BS-5351 | ISO 17292",
        image: "./bti_valves/ball_valve_new.png",
        specs: [
            "Material: CI | CS | SS | AS | A 105 | F304 | F316 | CF3 | CF3M | CN7M",
            "Seat: PTFE | Reinforced PTFE | Buna-N | Graphoil | Graphite",
            "Ends: Screwed | BSPT | NPT | Socket Weld | Butt Weld | Flanged",
            "Pressure: ASA 150# | 300# | 600# | 800# | 900# | 1500# | 2500#",
            "Type: Single Pc | Two Pc | Three Pc | 3 Way | 4 Way",
            "Size: 6mm to 750mm"
        ],
        description: "Operation: Lever | Gear | Electrical Actuator | Pneumatic Rotary Actuator. Versatile ball valves for diverse applications."
    },
    {
        id: "butterfly-valves",
        category: "butterfly",
        title: "Butterfly Valves",
        subtitle: "API 609 | BS-5155 | BS EN 593 | AWWA C504 | IS 13095",
        image: "./bti_valves/butterfly_valve_new.png",
        specs: [
            "Material: CI | DI | CS | SS",
            "Seat: Nitrile | Neoprene | PTFE | Viton | Hypalon | Silicon",
            "Ends: Wafer Type | Double Flanged | Lug End",
            "Pressure: ASA 125# | 150# | PN 1.0 | PN 1.6 | PN 20 | PN 2.5",
            "Type: Centric Disc Design | Offset Disc Design | Triple Offset Disc Design",
            "Size: 40mm to 2000mm"
        ],
        description: "Operation: Lever | Gear | Electrical Actuator | Pneumatic Rotary Actuator. Compact and efficient for flow regulation."
    },
    {
        id: "swing-check-valves",
        category: "check",
        title: "Swing Check Valvles",
        subtitle: "BS 1868",
        image: "./bti_valves/swing_check_valve_new.png",
        specs: [
            "Material: CI | CS | SS | AS | LCB | WC6 | WC9",
            "Ends: Flanged End | Buttweld End",
            "Pressure: 125# | 150# | 300# | 600# | 900# | 1500# | 2500# | PN 16, 40, 64",
            "Size: 15mm to 1000mm"
        ],
        description: "Robust non-return valve preventing backflow with minimal pressure drop."
    },
    {
        id: "wafer-check-valves",
        category: "check",
        title: "Wafer Check Valve",
        subtitle: "API 6D",
        image: "./bti_valves/wafer_check_valve_new.png",
        specs: [
             "Material: CI | CS | SS | AS | LCB | WC6 | WC9",
             "Type: Wafer Type",
            "Pressure: PN 10 | PN 16",
            "Size: 15mm to 800mm" 
        ],
        description: "Compact check valve designed to fit between flanges, saving space and weight."
    },
    {
        id: "non-slam-check-valves",
        category: "check",
        title: "Non Slam Disc Check Valve",
        subtitle: "BS 7438",
        image: "./bti_valves/non_slam_check_valve_new.png",
        specs: [
            "Material: CI | CS | SS | AS | LCB | WC6 | WC9",
            "Type: Wafer Type",
            "Pressure: PN 10 | PN 16 | PN 40",
             "Size: 15mm to 800mm"
        ],
        description: "Engineered to prevent water hammer and slamming during closure."
    },
    {
        id: "dual-plate-check-valves",
        category: "check",
        title: "Dual Plate Check Valve",
        subtitle: "API 594",
        image: "./bti_valves/dual_plate_check_valve_new.png",
        specs: [
           "Material: CI | CS | SS | AS | LCB | WC6 | WC9",
           "Ends: Flanged End | Wafer Type",
           "Pressure: PN 10 | PN 16",
           "Size: 15mm to 800mm"
        ],
        description: "Dual plate design offers lighter weight and faster response."
    },
     {
        id: "strainers",
        category: "strainer",
        title: "Strainers",
        subtitle: "BTI 014",
        image: "./bti_valves/strainer_new.png",
        specs: [
            "Material: Cast Iron | Cast Steel | Stainless Steel",
            "Ends: Flanged | Screwed End",
            "Type: Y Type | T Type | Pot Type | Basket Type",
            "Pressure: ASA 150# | 300# | PN 40",
            "Size: 15mm to 800mm"
        ],
        description: "Essential filtration equipment for protecting pumps and valves from debris."
    },
    {
        id: "sluice-reflux-valves",
        category: "gate",
        title: "Sluice & Reflux Valves",
        subtitle: "IS 14846 | IS 5312",
        image: "./bti_valves/sluice_reflux_valve.png",
        specs: [
            "Material: Cast Iron | C.S with G.M. or S.S. Internals",
            "Ends: Flanged Ends",
            "Pressure: PN 0.6 | PN 1.0 | PN 1.6",
            "Body Test: 0.9 Mpa | 1.5 Mpa | 2.4 Mpa",
            "Seat Test: 0.6 Mpa | 1.0 Mpa | 1.6 Mpa",
            "Type: Inside Screw (Non Rising Spindle) | Outside Screw (Rising Spindle)",
            "Size: 50mm to 1200mm"
        ],
        description: "Heavy-duty sluice valves for water works and industrial applications."
    },
    {
        id: "forged-steel-valves",
        category: "gate",
        title: "Forged Steel Valves",
        subtitle: "API 602 | BS-5352 | MARCK-024",
        image: "./bti_valves/forged_steel_valve.png",
        specs: [
            "Type: Gate | Globe | Check | T-Type Strainers",
            "Material: ASTM A 105 | F304 | F304L | F316 | F316L | F5 | F9 | F11 | F22",
            "Ends: Socketweld | Screwed | Butt Weld | Flanged End",
            "Type Pattern: Straight Pattern | Y Type Pattern",
            "Pressure: ASA 150# | 300# | 600# | 800# | 1500# | 2500#",
            "Size: 15mm to 50mm"
        ],
        description: "High-pressure forged steel valves for critical applications in power and petrochemical industries."
    },
    {
        id: "knife-edge-gate-valves",
        category: "gate",
        title: "Knife Edge Gate Valve",
        subtitle: "MSS SP-81 | Pulp Valve",
        image: "./bti_valves/knife_edge_gate_valve.png",
        specs: [
            "Material: C.I | CS | SS",
            "Ends: Flanged End | Wafer Lug Type",
            "Type: UNI-DIRECTIONAL | BI-DIRECTIONAL",
            "Operation: Handwheel | Gear | Pneumatic Cylinder",
            "Pressure: PN 10 | PN 16",
            "Size: 50mm to 1200mm"
        ],
        description: "Designed for isolation of fluids with suspended solids, pulp, and slurries."
    },
    {
        id: "diaphragm-valves",
        category: "diaphragm",
        title: "Diaphragm Valves",
        subtitle: "BS-5156 | BS 6755-1",
        image: "./bti_valves/diaphragm_valve_new.png",
        specs: [
            "Material: CI | CS | SS",
            "Lining: Rubber Lined | Glass Lined | Unlined",
            "Ends: Screwed | Flanged End",
            "Pressure: PN 10 | PN 16 | 150# Class",
            "Size: 25mm to 400mm"
        ],
        description: "Leak-proof valves ideal for corrosive, abrasive, and viscous fluids."
    },
    {
        id: "pfa-lined-valves",
        category: "special",
        title: "PFA Lined Valves",
        subtitle: "API-599 | BS-5158 | BS-5351 | BS-5159 | BS-5155",
        image: "./bti_valves/pfa_lined_valve.png",
        specs: [
            "Material: Ductile Iron | CS",
            "Type: Butterfly | Plug | Ball | Ball Check & Diaphragm Valves",
            "Lining: FEP | PFA | PTFE | PVDF Lined Valves",
            "Ends: Wafer & Lugged End | Butterfly & Flanged End",
            "Size: 25mm to 200mm"
        ],
        description: "Corrosion-resistant lined valves for aggressive chemical applications."
    },
    {
        id: "air-valves",
        category: "air",
        title: "Air Valves",
        subtitle: "BTI-016 | IS 14845",
        image: "./bti_valves/air_release_valve.png",
        specs: [
            "Material: CI | CS | GM",
            "Ends: Screwed | Flanged End",
            "Type: Single Acting | Double Acting | Kinetic Type Isolating",
            "Pressure: ASA 125# | 150# | 300# | PN 1.6",
            "Size: 25mm to 600mm"
        ],
        description: "Efficient air release and vacuum breaking valves for pipeline protection."
    },
    {
        id: "plug-valves",
        category: "plug",
        title: "Plug Valves",
        subtitle: "BS-5158 | BS-5353 | API-599 | API 6D",
        image: "./bti_valves/plug_valve.png",
        specs: [
            "Material: CI | DI | CS | SS",
            "Type: PTFE Sleeved | Lubricated | Non-Lubricated",
            "Ends: Screwed | Flanged | Buttweld",
            "Pressure: Class 150#",
            "Size: 25mm to 200mm"
        ],
        description: "Reliable isolation valves with low pressure drop and quick operation."
    },
    {
        id: "safety-valves",
        category: "safety",
        title: "Safety Valve",
        subtitle: "API 526",
        image: "./bti_valves/safety_relief_valve.png",
        specs: [
            "Material: CS | SS",
            "Ends: Flanged End",
            "Type: Ordinary Lift Type | High Lift Type | Full Lift Type",
            "Pressure: ASA 150# | 300# | PN 40",
            "Size: 25mm to 200mm"
        ],
        description: "Critical safety device for overpressure protection in industrial systems."
    },
    {
        id: "steam-traps",
        category: "steam",
        title: "Steam Traps",
        subtitle: "IS 12268",
        image: "./bti_valves/steam_trap_thermodynamic.png",
        specs: [
            "Material: CI | CA 15 | CF8 | CF8M | A 105 | F11 | F22",
            "Ends: Screwed | Socket | Flanged End",
            "Type: Thermo Dynamic (TD-3) | Horizontal Float Type | Vertical Inverted Bucket Type",
            "Pressure: ASA 800# | 1500# | 2500#",
            "Max Inlet Pressure: 10 Kg/Cm² | 30 Kg/Cm² | 248 Kg/Cm² AT 204° C",
            "Size: 15mm to 50mm"
        ],
        description: "Efficient condensate removal systems available in Thermo Dynamic, Float, and Bucket types."
    },
    {
        id: "fabricated-valves",
        category: "fabricated",
        title: "Fabricated Valve Range",
        subtitle: "Custom Engineered Solutions",
        image: "./bti_valves/fabricated_butterfly_valve.png",
        specs: [
            "Butterfly Valves Size: 40mm to 3000mm",
            "Strainers Type: Pot Type | Basket Type | T Type | Duplex Type",
            "Strainers Size: 15mm to 1200mm",
            "Construction: Fabricated Steel",
            "Application: Large Diameter Pipelines"
        ],
        description: "Large-scale fabricated butterfly valves and strainers for specialized industrial needs."
    },
    {
        id: "ss-valves",
        category: "ss",
        title: "Stainless Steel - Gate | Globe | NRV",
        subtitle: "Screwed End to ASME B 16.11",
        image: "./bti_valves/ss_gate_valve_screwed.png",
        specs: [
            "Material: SS 304 | SS 316 | SS 304L | SS 316L",
            "Ends: Screwed to BSP | BSPT | NPT | Socketweld",
            "Pressure Body: 425 Psig (30 Kg/Cm²)",
            "Pressure Seat: 300 Psig (21 Kg/Cm²)",
            "Size: 15mm to 50mm"
        ],
        description: "High-purity stainless steel valves for corrosive environments and hygienic applications."
    },
    {
        id: "sight-glass",
        category: "instrumentation",
        title: "Tube Glass & Double Window Sight Glass",
        subtitle: "BTI-019",
        image: "./bti_valves/double_window_sight_glass.png",
        specs: [
            "Material: CS | SS",
            "Ends: Flanged",
            "Pressure: ASA 150#",
            "Size: 15mm to 150mm"
        ],
        description: "Visual flow indicators for monitoring process fluid clarity and flow."
    },
    {
        id: "gun-metal-valves",
        category: "bronze",
        title: "Gun Metal | Bronze Valves",
        subtitle: "IS 778 CL-I",
        image: "./bti_valves/gun_metal_gate_valve.png",
        specs: [
            "Types: Gate Valve | Globe Valve | Horizontal NRV | Steam Stop Valve",
            "Standard: As per IS 778 CL-I",
            "Material: Gun Metal / Bronze",
            "Application: Water, Oil, Gas"
        ],
        description: "Durable bronze valves ideal for marine and general utility services."
    },
    {
        id: "flanges-fittings",
        category: "fittings",
        title: "Flanges & Fittings",
        subtitle: "IBR APPROVED",
        image: "./bti_valves/flanges_fittings_group.png",
        specs: [
            "Material: MS | A105 | SS 304 | SS 316 | SS 304L | SS 316L",
            "Rating: ASA 150# to 2500# | ND-16 | ND-40 | BS 10 TABLE E | D | F | K | J",
            "Type: SORF | Blind | WNRF | Etc.",
            "Fittings: Carbon Steel Seamless Bends | Long Radius | Elbows | Concentric Reducers",
            "Size: 15mm to 2000mm"
        ],
        description: "Comprehensive range of IBR approved flanges and pipe fittings."
    }
];
